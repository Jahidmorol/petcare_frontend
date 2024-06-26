/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Dropdown, MenuProps } from "antd";
import Image from "next/image";
import { FiLogOut } from "react-icons/fi";
import userAvatar from "../../../../public/petcare-photo.jpg";
import Link from "next/link";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/features/auth/authSlice";
import { RxDashboard } from "react-icons/rx";
import { GoHome } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import "./NavBar.css";
import { useRouter } from "next/navigation";

export const deleteCookie = (name: string) => {
  document.cookie = `${name}=; Max-Age=-99999999;`;
};

const NavDropDown = ({ user }: { user: any }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handelLogOut = async () => {
    deleteCookie("accessToken");
    dispatch(logout());
    router.push("/");
  };

  let userRole;
  if (user?.role === "ADMIN") {
    userRole = "admin";
  }
  if (user?.role === "CUSTOMER") {
    userRole = "customer";
  }

  const items: MenuProps["items"] = [
    {
      label: (
        <Link href="/my-profile">
          <div className="p-2 flex items-center !w-[235px]">
            <Image
              src={user?.photo || userAvatar}
              width={40}
              height={40}
              alt="Profile"
              className="w-[40px] h-[40px] object-cover rounded-full"
            />
            <div className="ml-4">
              <h2 className="text-sm text-primary font-semibold">
                {user?.name}
              </h2>
              <p className="text-sm whitespace-normal text-wrap break-words ">
                {user?.email}
              </p>
            </div>
          </div>
        </Link>
      ),
      key: "profile",
    },
    {
      type: "divider",
    },
    {
      label: (
        <Link href={"/"}>
          <h2 className="px-2 py-1 flex items-center gap-2 text-base text-secondary !w-[235px]">
            <GoHome className="text-secondary pt-[1px] w-[1.1rem] h-[1.2rem]" />
            Home
          </h2>
        </Link>
      ),
      key: "home",
    },
    {
      type: "divider",
    },
    {
      label: (
        <Link href={`/dashboard/${userRole}`}>
          <h2 className="px-2 py-1 flex items-center gap-2 text-base text-secondary !w-[235px]">
            <RxDashboard className="text-secondary pt-[1.5px] w-[1.1rem] h-[1.1rem]" />
            Dashboard
          </h2>
        </Link>
      ),
      key: "dashboard",
    },
    {
      type: "divider",
    },
    {
      label: (
        <h2 className="px-2 py-1 flex items-center gap-2 text-base text-secondary !w-[235px]">
          <FiLogOut className="text-secondary pt-[1px] w-[1.1rem] h-[1.1rem]" />{" "}
          Logout
        </h2>
      ),
      key: "logout",
      onClick: handelLogOut,
    },
  ];

  // if (isLoading) {
  //   return null;
  // }

  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <div className="" onClick={(e) => e.preventDefault()}>
        <div className="flex items-center justify-end cursor-pointer">
          {/* <IoIosNotificationsOutline className="w-8 h-8 text-secondary" /> */}
          <Image
            src={user?.photo || userAvatar}
            alt="Profile"
            width={32}
            height={32}
            className="w-[32px] h-[32px] object-cover rounded-full mr-3"
          />
          <h2 className="text-base text-secondary mr-2">{user?.name}</h2>
          <IoIosArrowDown className="text-secondary mt-1" fontSize={20} />
        </div>
      </div>
    </Dropdown>
  );
};

export default NavDropDown;
