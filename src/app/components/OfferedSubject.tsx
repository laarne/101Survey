import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { BookOpen, Users, Clock, MapPin, Search } from "lucide-react";
import { offeredSubjects } from "../data/mockData";
import { useState } from "react";
import { Input } from "./ui/input";

export function OfferedSubject() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSubjects = offeredSubjects.filter(
    (subject) =>
      subject.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Offered Subjects</h1>
        <p className="text-gray-600">
          Browse available subjects for the next semester
        </p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <Input
              placeholder="Search by subject code, title, or instructor..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Subjects</p>
                <p className="text-3xl font-bold text-gray-900">
                  {filteredSubjects.length}
                </p>
              </div>
              <BookOpen className="text-blue-600" size={32} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Units</p>
                <p className="text-3xl font-bold text-gray-900">
                  {filteredSubjects.reduce((sum, s) => sum + s.units, 0)}
                </p>
              </div>
              <BookOpen className="text-green-600" size={32} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Available Slots</p>
                <p className="text-3xl font-bold text-gray-900">
                  {filteredSubjects.reduce((sum, s) => {
                    const [available] = s.slots.split("/").map(Number);
                    return sum + available;
                  }, 0)}
                </p>
              </div>
              <Users className="text-purple-600" size={32} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subject List */}
      <Card>
        <CardHeader>
          <CardTitle>Available Subjects</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredSubjects.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No subjects found matching your search
            </p>
          ) : (
            <div className="space-y-4">
              {filteredSubjects.map((subject, index) => {
                const [available, total] = subject.slots.split("/").map(Number);
                const slotsPercentage = ((total - available) / total) * 100;
                const isAlmostFull = slotsPercentage >= 80;
                const isFull = available === 0;

                return (
                  <div
                    key={index}
                    className={`p-5 rounded-lg border-2 transition-all ${
                      isFull
                        ? "bg-gray-50 border-gray-300 opacity-75"
                        : isAlmostFull
                        ? "bg-amber-50 border-amber-200 hover:shadow-md"
                        : "bg-white border-gray-200 hover:shadow-md hover:border-blue-300"
                    }`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="bg-blue-600">{subject.code}</Badge>
                          <Badge variant="outline">{subject.section}</Badge>
                          {isFull && (
                            <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                              FULL
                            </Badge>
                          )}
                          {isAlmostFull && !isFull && (
                            <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
                              Almost Full
                            </Badge>
                          )}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {subject.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Instructor: {subject.instructor}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600 mb-1">Units</p>
                        <p className="text-2xl font-bold text-blue-600">{subject.units}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock size={16} />
                        <span>{subject.schedule}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin size={16} />
                        <span>{subject.room}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users size={16} />
                        <span>
                          {available} of {total} slots available
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-1 text-xs text-gray-600">
                        <span>Enrollment Progress</span>
                        <span>
                          {total - available}/{total} enrolled
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all ${
                            isFull
                              ? "bg-red-500"
                              : isAlmostFull
                              ? "bg-amber-500"
                              : "bg-green-500"
                          }`}
                          style={{ width: `${slotsPercentage}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="flex-1"
                        disabled={isFull}
                        variant={isFull ? "outline" : "default"}
                      >
                        {isFull ? "Section Full" : "Add to Enrollment"}
                      </Button>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-gray-600">Available Slots</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-amber-500 rounded"></div>
              <span className="text-gray-600">Almost Full (80%+)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span className="text-gray-600">Full</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
