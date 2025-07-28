'use client'

// Dependencies
import React from "react";

// Components
import Skeleton from "@/components/catalyst/skeleton";

const ROWS = 10;

const UserTableSkeleton = () => {
  return (
    <div className="overflow-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-100 bg-white table-auto">
        <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wide">
          <tr>
            <th scope="col" className="px-6 py-4 text-left">Nome</th>
            <th className="px-6 py-4 text-left">Cargo e departamento</th>
            <th className="px-6 py-4 text-center">Grupos</th>
            <th className="px-6 py-4 text-center">Status</th>
            <th className="px-6 py-4 text-right w-14">
              <span className="sr-only">Ações</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
          {Array.from({ length: ROWS }).map((_, index) => (
            <tr key={index} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4 w-[400px]">
                <div className="flex items-center gap-x-3">
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <div className="grid gap-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-40" />
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="grid gap-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </td>
              <td className="px-6 py-4 text-center">
                <Skeleton className="h-4 w-16 mx-auto" />
              </td>
              <td className="px-6 py-4 justify-center grid">
                <Skeleton className="h-6 w-16 mx-auto rounded-full" />
              </td>
              <td className="px-6 py-4 text-right">
                <Skeleton className="h-5 w-5 ml-auto" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTableSkeleton;
