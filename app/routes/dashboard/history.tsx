import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  History,
  FileText,
  Upload,
  MessageCircle,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  RotateCcw,
  Download,
  Eye,
  Search,
} from "lucide-react";

export default function HistoryPage() {
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const activities = [
    {
      id: 1,
      type: "upload",
      title: "Uploaded Machine Learning Slides",
      description: "ML_Lecture_01.pdf, ML_Lecture_02.pdf, ML_Lecture_03.pdf",
      status: "completed",
      timestamp: "2024-01-15T10:30:00",
      result: "Generated summary notes (2.4 MB)",
      processingTime: "2m 15s",
    },
    {
      id: 2,
      type: "generation",
      title: "Generated Detailed Notes",
      description: "Organic Chemistry Reactions from CHEM_301_Slides.pdf",
      status: "completed",
      timestamp: "2024-01-14T14:20:00",
      result: "Created 12-page detailed notes",
      processingTime: "1m 45s",
    },
    {
      id: 3,
      type: "chat",
      title: "AI Chat Session",
      description: "Asked 8 questions about European History Timeline",
      status: "completed",
      timestamp: "2024-01-13T16:45:00",
      result: "Session completed successfully",
      processingTime: "15m 30s",
    },
    {
      id: 4,
      type: "upload",
      title: "Uploaded Statistics Materials",
      description: "STAT_300_Chapter_5.pdf",
      status: "processing",
      timestamp: "2024-01-12T09:15:00",
      result: "Processing flashcards...",
      processingTime: "1m 20s (ongoing)",
    },
    {
      id: 5,
      type: "generation",
      title: "Generated Mind Map",
      description: "Molecular Biology Concepts visualization",
      status: "failed",
      timestamp: "2024-01-11T11:20:00",
      result: "Error: File format not supported",
      processingTime: "0m 30s",
    },
    {
      id: 6,
      type: "upload",
      title: "Uploaded Calculus Notes",
      description: "MATH_202_Integration.pdf, MATH_202_Applications.pdf",
      status: "completed",
      timestamp: "2024-01-10T13:30:00",
      result: "Generated summary notes (1.2 MB)",
      processingTime: "1m 55s",
    },
    {
      id: 7,
      type: "chat",
      title: "AI Study Session",
      description: "Reviewed calculus integration techniques",
      status: "completed",
      timestamp: "2024-01-10T14:45:00",
      result: "Answered 12 questions",
      processingTime: "22m 15s",
    },
    {
      id: 8,
      type: "generation",
      title: "Generated Outline",
      description: "Physics Mechanics from PHY_101_Slides.pdf",
      status: "completed",
      timestamp: "2024-01-09T15:20:00",
      result: "Created structured outline (8 sections)",
      processingTime: "2m 10s",
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "upload":
        return Upload;
      case "generation":
        return FileText;
      case "chat":
        return MessageCircle;
      default:
        return History;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return CheckCircle;
      case "processing":
        return RotateCcw;
      case "failed":
        return XCircle;
      default:
        return AlertCircle;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-100";
      case "processing":
        return "text-blue-600 bg-blue-100";
      case "failed":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  const filteredActivities = activities.filter((activity) => {
    const matchesSearch =
      activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || activity.status === filterStatus;
    const matchesType = filterType === "all" || activity.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const stats = {
    total: activities.length,
    completed: activities.filter((a) => a.status === "completed").length,
    processing: activities.filter((a) => a.status === "processing").length,
    failed: activities.filter((a) => a.status === "failed").length,
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Activity History
        </h1>
        <p className="text-gray-600">
          Track your uploads, note generations, and AI interactions
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">
              {stats.total}
            </div>
            <div className="text-sm text-gray-600">Total Activities</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {stats.completed}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {stats.processing}
            </div>
            <div className="text-sm text-gray-600">Processing</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {stats.failed}
            </div>
            <div className="text-sm text-gray-600">Failed</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search activities..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <select
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="upload">Uploads</option>
            <option value="generation">Note Generation</option>
            <option value="chat">AI Chat</option>
          </select>

          <select
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="processing">Processing</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      {/* Activity Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <History className="w-5 h-5 mr-2" />
            Activity Timeline
          </CardTitle>
          <CardDescription>
            Showing {filteredActivities.length} of {activities.length}{" "}
            activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredActivities.map((activity, index) => {
              const ActivityIcon = getActivityIcon(activity.type);
              const StatusIcon = getStatusIcon(activity.status);
              const statusColor = getStatusColor(activity.status);

              return (
                <div
                  key={activity.id}
                  className={`flex items-start space-x-4 p-4 rounded-lg border ${
                    index === 0
                      ? "border-blue-200 bg-blue-50"
                      : "border-gray-200 hover:bg-gray-50"
                  } transition-colors`}
                >
                  {/* Activity Icon */}
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border-2 border-gray-200">
                    <ActivityIcon className="w-5 h-5 text-gray-600" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {activity.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {activity.description}
                        </p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{formatTimestamp(activity.timestamp)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span>
                              Processing time: {activity.processingTime}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div
                        className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}
                      >
                        <StatusIcon className="w-3 h-3" />
                        <span className="capitalize">{activity.status}</span>
                      </div>
                    </div>

                    {/* Result */}
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700">{activity.result}</p>

                      {activity.status === "completed" && (
                        <div className="flex items-center space-x-2 mt-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="w-3 h-3 mr-1" />
                            Download
                          </Button>
                        </div>
                      )}

                      {activity.status === "failed" && (
                        <div className="flex items-center space-x-2 mt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <RotateCcw className="w-3 h-3 mr-1" />
                            Retry
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredActivities.length === 0 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <History className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No activities found
              </h3>
              <p className="text-gray-600">
                {searchTerm || filterType !== "all" || filterStatus !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "Start using TurboStudy to see your activity history here"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
