"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import shallow from "zustand/shallow";

import AuthForm from "@/components/authForm";
import languages from "@/config/translations";
import { postVerificationRequest } from "@/store/auth/requests";
import { useAuth } from "@/storeZustand/auth/store";

const MainClientPage = () => {
  return (
    <div
      className={"flex items-center overflow-x-auto flex-nowrap py-5"}
      style={{ backgroundColor: "red" }}
    >
      Main
    </div>
  );
};

export default MainClientPage;
