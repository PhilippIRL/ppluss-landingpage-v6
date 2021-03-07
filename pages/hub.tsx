import { useEffect } from "react";

export default function hub({router}) {
    useEffect(() => {
        router.replace("/socials");
    });
    return (
        <>
            <span>Redirecting...</span>
        </>
    );

}