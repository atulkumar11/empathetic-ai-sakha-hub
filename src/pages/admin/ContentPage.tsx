
import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import ContentManagementTab from "@/components/admin/dashboard/ContentManagementTab";

const ContentPage = () => {
  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Content Management</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage all educational content on the platform
          </p>
        </div>
      </div>
      
      <ContentManagementTab />
    </AdminLayout>
  );
};

export default ContentPage;
