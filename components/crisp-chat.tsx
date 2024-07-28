"use client";

import { useEffect } from "react";

import {Crisp} from "crisp-sdk-web";

export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("1ffe4245-284f-42c2-b250-ac97ad892d86")
    },[])

    return null;
}