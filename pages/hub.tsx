import { useEffect } from "react";
import { useRouter } from "next/router";

export default function hub() {

    let router = useRouter();

    useEffect(() => {
        router.replace("/socials");
    });

    return (
        <>
            <span>Redirecting...</span>
        </>
    );

}
