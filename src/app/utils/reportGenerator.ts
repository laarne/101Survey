import type { ReviewState } from "../contexts/ReviewContext";
import {
  heuristics,
  severityScale,
  uxHealthRatings,
  calculateSUSScore,
  getSUSGrade,
  susStatements,
  qualitativeQuestions,
  pourCategories,
  accessibilityScale,
  accessibilityRatings,
  accessibilityReflectionQuestions,
} from "../data/reviewData";

const baseStyles = `
  @page { size: A4; margin: 1.5cm; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 11pt; color: #222; line-height: 1.5; padding: 1.5cm; }
  .page { page-break-after: always; }
  .page:last-child { page-break-after: avoid; }
  h1 { font-size: 16pt; text-align: center; margin-bottom: 4px; }
  h2 { font-size: 13pt; margin: 16px 0 8px; border-bottom: 2px solid #333; padding-bottom: 4px; }
  h3 { font-size: 12pt; margin: 12px 0 6px; }
  .header-sub { text-align: center; font-size: 10pt; color: #555; margin-bottom: 16px; }
  .info-grid { margin: 16px 0; }
  .info-row { display: flex; margin: 4px 0; }
  .info-label { width: 200px; font-weight: bold; }
  .info-value { flex: 1; border-bottom: 1px solid #999; padding-left: 8px; }
  .eval-type { margin: 8px 0 8px 20px; }
  table { width: 100%; border-collapse: collapse; margin: 8px 0 16px; font-size: 10pt; }
  th, td { border: 1px solid #555; padding: 6px 8px; text-align: left; vertical-align: top; }
  th { background: #e8e8e8; font-weight: bold; }
  .severity-col { width: 90px; text-align: center; }
  .ref-col { width: 100px; text-align: center; }
  .heuristic-desc { font-style: italic; color: #444; margin-bottom: 8px; font-size: 10pt; }
  .checklist { margin: 6px 0; padding-left: 20px; }
  .checklist li { margin: 2px 0; list-style: none; }
  .checklist li::before { content: "☐ "; }
  .problem-list { margin: 8px 0; padding-left: 20px; }
  .problem-list li { margin: 3px 0; }
  .rating-scale { margin: 8px 0 8px 20px; }
  .rating-scale div { margin: 2px 0; }
  .score-box { text-align: center; font-size: 14pt; font-weight: bold; margin: 12px 0; padding: 10px; border: 2px solid #333; }
  .metrics-section { margin-top: 20px; padding: 12px; background: #f5f5f5; border-radius: 4px; }
  .metrics-section h3 { font-size: 11pt; margin-bottom: 8px; }
  .metrics-section p { font-size: 9pt; margin: 2px 0; color: #555; }
`;

function infoSection(state: ReviewState): string {
  const evalType = state.evaluatorInfo.evaluationType === "peer-review"
    ? `<label>☐ Diagnosis (Self-Audit of our own Target App)</label><br><label>☑ Peer Review (Auditing another Team's Redesign)</label>`
    : `<label>☑ Diagnosis (Self-Audit of our own Target App)</label><br><label>☐ Peer Review (Auditing another Team's Redesign)</label>`;

  return `
    <div class="info-grid">
      <div class="info-row"><span class="info-label">Group Name/Number:</span><span class="info-value">${state.evaluatorInfo.groupName || "—"}</span></div>
      <div class="info-row"><span class="info-label">Target App Name:</span><span class="info-value">${state.evaluatorInfo.targetApp}</span></div>
      <div class="info-row"><span class="info-label">Evaluator Name:</span><span class="info-value">${state.evaluatorInfo.name}</span></div>
      <div class="info-row"><span class="info-label">Device Used:</span><span class="info-value">${state.evaluatorInfo.device}</span></div>
      <div class="info-row"><span class="info-label">Date:</span><span class="info-value">${state.evaluatorInfo.date}</span></div>
    </div>
    <div class="eval-type"><strong>Evaluation Type:</strong><br>${evalType}</div>
  `;
}

function metricsAppendix(state: ReviewState): string {
  const elapsed = state.metrics.startTime > 0
    ? Math.floor((Date.now() - state.metrics.startTime) / 1000)
    : 0;
  const m = Math.floor(elapsed / 60);
  const s = elapsed % 60;

  return `
    <div class="metrics-section">
      <h3>Auto-Tracked Metrics (Appendix)</h3>
      <p><strong>Total Session Time:</strong> ${m}m ${s}s</p>
      <p><strong>Total Clicks:</strong> ${state.metrics.totalClicks}</p>
      <p><strong>Pages Visited:</strong> ${state.metrics.navigationLog.length}</p>
      <p><strong>Navigation Path:</strong> ${state.metrics.navigationLog.map(n => n.pageName || n.path).join(" → ") || "—"}</p>
    </div>
  `;
}

// ── HEURISTIC REPORT ───────────────────────────────────────

function generateHeuristicReport(state: ReviewState): string {
  const allObs = state.heuristicObservations.flat();
  const totalScore = allObs.reduce((s, o) => s + o.severity, 0);
  const rating = uxHealthRatings.find((r) => totalScore >= r.min && totalScore <= r.max);

  // Problem list
  const problemList = allObs
    .filter((o) => o.severity > 0)
    .map((o) => `<li><strong>${severityScale[o.severity].label}</strong> – ${o.description}</li>`)
    .join("\n");

  // Heuristic pages
  const heuristicPages = heuristics.map((h, i) => {
    const obs = state.heuristicObservations[i];
    const rows = obs.length > 0
      ? obs.map((o) => `<tr><td>${o.description}</td><td class="severity-col">${o.severity}</td><td class="ref-col">${o.screenshotRef || "—"}</td></tr>`).join("\n")
      : `<tr><td>No issues found</td><td class="severity-col">0</td><td class="ref-col">—</td></tr>`;

    const checklist = h.checklist.map((c) => `<li>${c}</li>`).join("\n");

    return `
      <h3>${h.id}. ${h.name}</h3>
      <p class="heuristic-desc">${h.description}</p>
      <ul class="checklist">${checklist}</ul>
      <table>
        <tr><th>Observation / Problem Description</th><th class="severity-col">Severity (0-4)</th><th class="ref-col">Screenshot Ref #</th></tr>
        ${rows}
      </table>
    `;
  }).join("\n");

  // Summary table
  const summaryRows = heuristics.map((h, i) => {
    const score = state.heuristicObservations[i].reduce((s, o) => s + o.severity, 0);
    return `<tr><td>${h.id}. ${h.name}</td><td class="severity-col">${score}</td></tr>`;
  }).join("\n");

  const ratingChecks = uxHealthRatings.map((r) => {
    const checked = rating === r ? "☑" : "☐";
    const label = r.max === Infinity ? `${r.min}+ Points: ${r.label}.` : `${r.min}–${r.max} Points: ${r.label}.`;
    return `<div>${checked} ${rating === r ? `<strong>${label}</strong>` : label}</div>`;
  }).join("\n");

  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Heuristic Audit - ${state.evaluatorInfo.name}</title><style>${baseStyles}</style></head><body>
    <div class="page">
      <h1>Detailed Heuristic Audit Toolkit</h1>
      <div class="header-sub">IT 101: Human Computer Interaction<br>2nd Semester, SY 2025-2026</div>
      ${infoSection(state)}
      <h2>PART A: INSTRUCTIONS</h2>
      <ol style="padding-left:20px; margin:8px 0;">
        <li>Each member must fill out this form <strong>independently</strong> first. Do not share answers yet.</li>
        <li>Meet as a group. Compare your findings.</li>
        <li>Rate every error you find from 0 to 4.</li>
      </ol>
      <table>
        <tr><th>Rating</th><th>Description</th></tr>
        ${severityScale.map((s) => `<tr><td>${s.value} - ${s.label}</td><td>${s.description}</td></tr>`).join("\n")}
      </table>
    </div>

    <div class="page">
      <h2>List of Specific Problems Found</h2>
      <ol class="problem-list">${problemList || "<li>No problems found.</li>"}</ol>
    </div>

    <div class="page">
      <h2>PART B: THE 10 HEURISTIC CHECKLISTS</h2>
      ${heuristicPages}
    </div>

    <div class="page">
      <h2>PART C: THE SUMMARY</h2>
      <table>
        <tr><th>Heuristic Item</th><th class="severity-col">Total Severity Points</th></tr>
        ${summaryRows}
        <tr style="font-weight:bold; background:#ddd;"><td>Total (Calculated UX Health Score)</td><td class="severity-col">${totalScore}</td></tr>
      </table>
      <div class="rating-scale">
        <strong>Descriptive Rating:</strong> The lower the score the better.<br><br>
        ${ratingChecks}
      </div>
      ${metricsAppendix(state)}
    </div>
  </body></html>`;
}

// ── USABILITY REPORT ───────────────────────────────────────

function generateUsabilityReport(state: ReviewState): string {
  const susScore = calculateSUSScore(state.susResponses);
  const grade = getSUSGrade(susScore);

  const taskRows = state.usabilityTasks.map((t, i) => `
    <tr>
      <td style="text-align:center;">${i + 1}</td>
      <td>${t.description}</td>
      <td style="text-align:center;">${t.timeSeconds} sec</td>
      <td style="text-align:center;">${t.result === "pass" ? "☑ P" : "☐ P"} ${t.result === "fail" ? "☑ F" : "☐ F"} ${t.result === "assist" ? "☑ A" : "☐ A"}</td>
      <td style="text-align:center;">${t.errorClicks}</td>
      <td>${t.notes || "—"}</td>
    </tr>
  `).join("\n");

  const susRows = susStatements.map((s, i) => `
    <tr>
      <td>${i + 1}. ${s}</td>
      ${[1, 2, 3, 4, 5].map((v) => `<td style="text-align:center;">${state.susResponses[i] === v ? "◉" : "◯"}</td>`).join("")}
    </tr>
  `).join("\n");

  const qualRows = qualitativeQuestions.map((q, i) => `
    <p><strong>${i + 1}. ${q}</strong></p>
    <p style="margin: 4px 0 16px 16px; border-bottom: 1px solid #ccc; padding-bottom: 8px;">${state.qualitativeAnswers[i] || "—"}</p>
  `).join("\n");

  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Usability Evaluation - ${state.evaluatorInfo.name}</title><style>${baseStyles}</style></head><body>
    <div class="page">
      <h1>HCI Usability Evaluation Form</h1>
      <div class="header-sub">IT 101: Human Computer Interaction<br>2nd Semester, SY 2025-2026</div>
      <h2>SECTION A: TEST SESSION DETAILS</h2>
      ${infoSection(state)}
      <div class="info-grid">
        <div class="info-row"><span class="info-label">Version Tested:</span><span class="info-value">${state.usabilitySessionDetails.version === "redesigned" ? "☑ Redesigned (New)" : "☑ Original (Old)"}</span></div>
        <div class="info-row"><span class="info-label">Participant ID:</span><span class="info-value">${state.usabilitySessionDetails.participantId || "—"}</span></div>
        <div class="info-row"><span class="info-label">Profession:</span><span class="info-value">${state.usabilitySessionDetails.profession || "—"}</span></div>
        <div class="info-row"><span class="info-label">Gender:</span><span class="info-value">${state.usabilitySessionDetails.gender}</span></div>
      </div>
    </div>

    <div class="page">
      <h2>SECTION B: TASK PERFORMANCE LOG</h2>
      <table>
        <tr><th style="width:30px">#</th><th>Task Description</th><th style="width:70px">Time</th><th style="width:100px">Result</th><th style="width:60px">Errors</th><th>Notes</th></tr>
        ${taskRows}
      </table>
    </div>

    <div class="page">
      <h2>SECTION C: SYSTEM USABILITY SCALE (SUS)</h2>
      <table>
        <tr><th>Statement</th><th style="width:30px">1</th><th style="width:30px">2</th><th style="width:30px">3</th><th style="width:30px">4</th><th style="width:30px">5</th></tr>
        ${susRows}
      </table>
      <div class="score-box">SUS Score: ${susScore.toFixed(1)} / 100 — Grade: ${grade.grade} (${grade.label})</div>

      <h2>SECTION D: QUALITATIVE INSIGHTS</h2>
      ${qualRows}
      ${metricsAppendix(state)}
    </div>
  </body></html>`;
}

// ── ACCESSIBILITY REPORT ───────────────────────────────────

function generateAccessibilityReport(state: ReviewState): string {
  const overallTotal = state.accessibilityScores.flat().reduce((s, item) => s + item.score, 0);
  const rating = accessibilityRatings.find((r) => overallTotal >= r.min && overallTotal <= r.max);

  const checklistPages = pourCategories.map((cat, catI) => {
    const catScores = state.accessibilityScores[catI];
    const catTotal = catScores.reduce((s, item) => s + item.score, 0);
    const rows = cat.criteria.map((c, itemI) => `
      <tr><td>${c.label}</td><td style="text-align:center;">${catScores[itemI].score}</td><td>${catScores[itemI].notes || "—"}</td></tr>
    `).join("\n");

    return `
      <h3>${cat.id}. ${cat.name.toUpperCase()}</h3>
      <p class="heuristic-desc">${cat.description}</p>
      <table>
        <tr><th>Criteria</th><th style="width:80px; text-align:center;">Score (0–3)</th><th>Notes</th></tr>
        ${rows}
      </table>
      <p><strong>${cat.name} Score: ${catTotal} / ${cat.maxScore}</strong></p>
    `;
  }).join("\n");

  const issuesList = state.accessibilityIssues.map((issue, i) => `<p>${i + 1}. ${issue || "—"}</p>`).join("\n");
  const improvementsList = state.accessibilityImprovements.map((imp, i) => `<p>${i + 1}. ${imp || "—"}</p>`).join("\n");
  const reflectionList = accessibilityReflectionQuestions.map((q, i) => `<p><strong>${i + 1}. ${q}</strong></p><p style="margin: 4px 0 16px 16px;">${state.accessibilityReflection[i] || "—"}</p>`).join("\n");

  const categoryScores = pourCategories.map((cat, i) => {
    const catTotal = state.accessibilityScores[i].reduce((s, item) => s + item.score, 0);
    return `<tr><td>${cat.name}</td><td style="text-align:center;">${catTotal} / ${cat.maxScore}</td></tr>`;
  }).join("\n");

  const ratingChecks = accessibilityRatings.map((r) => {
    const checked = rating === r ? "☑" : "☐";
    return `<div>${checked} ${rating === r ? `<strong>${r.min}–${r.max}: ${r.label}</strong>` : `${r.min}–${r.max}: ${r.label}`}</div>`;
  }).join("\n");

  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Accessibility Evaluation - ${state.evaluatorInfo.name}</title><style>${baseStyles}</style></head><body>
    <div class="page">
      <h1>UX Accessibility Evaluation Form</h1>
      <div class="header-sub">(Based on WCAG Principles – HCI Evaluation Tool)</div>
      <h2>A. Evaluation Information</h2>
      <div class="info-grid">
        <div class="info-row"><span class="info-label">System/Website Evaluated:</span><span class="info-value">${state.evaluatorInfo.targetApp}</span></div>
        <div class="info-row"><span class="info-label">Evaluator Name:</span><span class="info-value">${state.evaluatorInfo.name}</span></div>
        <div class="info-row"><span class="info-label">Course/Program:</span><span class="info-value">IT 101 – Human Computer Interaction</span></div>
        <div class="info-row"><span class="info-label">Date of Evaluation:</span><span class="info-value">${state.evaluatorInfo.date}</span></div>
      </div>
      <h2>B. Evaluation Scale</h2>
      <table>
        <tr><th>Score</th><th>Meaning</th><th>Description</th></tr>
        ${accessibilityScale.map((s) => `<tr><td>${s.value}</td><td>${s.label}</td><td>${s.description}</td></tr>`).join("\n")}
      </table>
    </div>

    <div class="page">
      <h2>C. Accessibility Evaluation Checklist</h2>
      ${checklistPages}
    </div>

    <div class="page">
      <h2>D. Overall Accessibility Score</h2>
      <table>
        <tr><th>Category</th><th style="text-align:center;">Score</th></tr>
        ${categoryScores}
        <tr style="font-weight:bold; background:#ddd;"><td>TOTAL SCORE</td><td style="text-align:center;">${overallTotal} / 63</td></tr>
      </table>

      <h2>E. Accessibility Rating</h2>
      <div class="rating-scale">${ratingChecks}</div>

      <h2>F. Key Accessibility Issues Identified</h2>
      ${issuesList}

      <h2>G. Recommended UX Improvements</h2>
      ${improvementsList}

      <h2>H. Evaluator Reflection</h2>
      ${reflectionList}
      ${metricsAppendix(state)}
    </div>
  </body></html>`;
}

// ── MAIN EXPORT ────────────────────────────────────────────

export function generateReport(state: ReviewState): string {
  switch (state.evaluationType) {
    case "heuristic":
      return generateHeuristicReport(state);
    case "usability":
      return generateUsabilityReport(state);
    case "accessibility":
      return generateAccessibilityReport(state);
    default:
      return "<html><body><p>No evaluation data found.</p></body></html>";
  }
}
