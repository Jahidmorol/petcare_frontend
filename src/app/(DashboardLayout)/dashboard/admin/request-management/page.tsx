"use client";
import {
  useGetAdoptionRequestQuery,
  useUpdateAdaptionRequestStatusMutation,
} from "@/redux/features/adaption/adaption.api";
import { Dropdown, Image, MenuProps, Table, TableProps } from "antd";
import React from "react";
import { IoIosArrowDown } from "react-icons/io";
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
        <div className="capitalize text-xs font-medium text-secondary">
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
        <span className="capitalize text-xs font-medium text-secondary">
          <span
            className={`w-1.5 h-1.5 rounded-full inline-block mr-1 mb-0.5 bg-red-500`}
          ></span>
          PENDING
        </span>
      ),
      key: "PENDING",
    },
  ];

  const adaptionColumn: TableProps<any>["columns"] = [
    {
      title: "User Name",
      key: "username",
      render: (record) => (
        <div className="flex items-center gap-2 ">
          <Image
            className="!w-12 !h-12 rounded-full"
            src={record?.user?.photo}
            alt="image"
          />
          <div>
            <h4 className="font-medium">{record?.user?.name}</h4>
            <p className="line-clamp-1">{record?.user?.email}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Pet Name",
      key: "name",
      render: (record) => (
        <div className="flex items-center gap-2 ">
          <Image
            className="!w-10 !h-10 rounded-md"
            src={record?.pet?.photo}
            alt="image"
          />
          <div>
            <h4 className="font-medium">{record?.pet?.name}</h4>
          </div>
        </div>
      ),
    },
    {
      title: "Pet Breed",
      key: "breed",
      render: (record) => <p className="">{record?.pet?.breed}</p>,
    },
    {
      title: "Pet Species",
      key: "species",
      render: (record) => <p className="">{record?.pet?.species}</p>,
    },
    {
      title: "Pet Age",
      key: "age",
      render: (record) => <p className="">{record?.pet?.age}</p>,
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
            trigger={["hover"]}
          >
            <a onClick={(e) => e.preventDefault()}>
              <div className="flex items-center justify-between border border-[#E1E4EA] rounded-md py-1 px-2 capitalize text-xs font-medium text-secondary">
                <div>
                  <span
                    className={`w-2 h-2 rounded-full inline-block mr-2 ${
                      record?.status === "APPROVED"
                        ? "bg-teal-600"
                        : "bg-red-500"
                    }`}
                  ></span>
                  {record?.status}
                </div>

                <IoIosArrowDown />
              </div>
            </a>
          </Dropdown>
        );
      },
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold border-b-2 mb-4 text-center py-4">
        Adaption Management
      </h2>
      <Table
        columns={adaptionColumn}
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
