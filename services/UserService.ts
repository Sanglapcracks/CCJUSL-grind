'use server';
import { prisma } from "@/prisma/client";

type RegistrationData = {
    phone: string;
    college: string;
    year: string;
    department: string;
}

const completeUserRegistration = async (data: RegistrationData, id: string) => {
    const status = await prisma.user.update({
        where: {
            id
        },
        data: {
            phone: data.phone,
            year: data.year,
            college: data.college,
            department: data.department
        }
    });
    return {ok: true, message: "Registration completed"};
}

export {completeUserRegistration};