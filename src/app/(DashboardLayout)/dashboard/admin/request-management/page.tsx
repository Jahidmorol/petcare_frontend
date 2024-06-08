"use client";
import {
  useGetAdoptionRequestQuery,
  useUpdateAdaptionRequestStatusMutation,
} from "@/redux/features/adaption/adaption.api";
import { Dropdown, Image, MenuProps, Table, TableProps } from "antd";
import React from "react";
import { toast } from "sonner";

const UserManagement = () => {
  const { data, isFetching } = useGetAdoptionRequestQuery(undefined);
  const [updateAdaptionStatus] = useUpdateAdaptionRequestStatusMutation();

  //   console.log('data', data);

  const handleUpdateStatus = async (data: any, id: string) => {
    const tostId = toast.loading("Status Updating...");
    try {
      const payload = {
        id,
        data: { status: data?.key },
      };

      const res = await updateAdaptionStatus(payload).unwrap();
      res && toast.success("Status Updated", { id: tostId, duration: 2000 });
    } catch (error) {
      console.log("error---=>", error);
      toast.error("something went wrong", { id: tostId, duration: 2000 });
    }
  };

  const statusItems: MenuProps["items"] = [
    {
      label: (
        <div className="border border-[#E1E4EA] rounded-md py-0.5 px-2 capitalize text-xs font-medium text-secondary">
          <span
            className={`w-1.5 h-1.5 rounded-full inline-block mr-1 mb-0.5 bg-teal-600`}
          ></span>
          APPROVED
        </div>
      ),
      key: "APPROVED",
    },
    {
      label: (
        <span className="border border-[#E1E4EA] rounded-md py-0.5 px-2 capitalize text-xs font-medium text-secondary">
          <span
            className={`w-1.5 h-1.5 rounded-full inline-block mr-1 mb-0.5 bg-red-500`}
          ></span>
          PENDING
        </span>
      ),
      key: "PENDING",
    },
  ];

  const userColumn: TableProps<any>["columns"] = [
    {
      title: "Name",
      key: "name",
      render: (record) => (
        <div className="flex items-center gap-2 ">
          <Image
            className="!w-12 !h-12 rounded-full"
            src={record?.pet?.photo}
            alt="image"
          />
          <div>
            <h4 className="font-medium">{record?.pet?.name}</h4>
            <p className="line-clamp-1">{record?.pet?.breed}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Age",
      key: "age",
      render: (record) => <p className="">{record?.pet?.age}</p>,
    },
    {
      title: "Species",
      key: "species",
      render: (record) => <p className="">{record?.pet?.species}</p>,
    },
    {
      title: "Size",
      key: "size",
      render: (record) => <p className="">{record?.pet?.size}</p>,
    },
    {
      title: "Temperament",
      key: "temperament",
      render: (record) => <p className="">{record?.pet?.temperament}</p>,
    },
    {
      title: "Gender",
      key: "gender",
      render: (record) => <p className="">{record?.pet?.gender}</p>,
    },
    {
      title: "Status",
      key: "status",
      render: (record: any) => {
        return (
          <Dropdown
            menu={{
              items: statusItems,
              onClick: (data) => handleUpdateStatus(data, record?.id),
            }}
            trigger={["click"]}
          >
            <a onClick={(e) => e.preventDefault()}>
              <span className="border border-[#E1E4EA] rounded-md py-0.5 px-2 capitalize text-xs font-medium text-secondary">
                <span
                  className={`w-1.5 h-1.5 rounded-full inline-block mr-1 mb-0.5 ${
                    record?.status === "APPROVED" ? "bg-teal-600" : "bg-red-500"
                  }`}
                ></span>
                {record?.status}
              </span>
            </a>
          </Dropdown>
        );
      },
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold border-b-2 mb-4 text-center py-2">
        User Management
      </h2>
      <Table
        columns={userColumn}
        dataSource={data?.data?.data}
        scroll={{ x: "max-content" }}
        tableLayout="fixed"
        loading={isFetching}
        pagination={false}
        className="w-[98%] border mx-auto rounded text-center"
      />
    </div>
  );
};

export default UserManagement;