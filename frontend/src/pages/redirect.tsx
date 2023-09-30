import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { encode } from "querystring";

const Redirect = () => {
  const router = useRouter();

  useEffect(() => {
    const { query } = router;
    const referrerUrl = query?.referrer_url;

    if (!referrerUrl) {
      router.push("/");
      return;
    }

    // Remove the 'referrer_url' parameter from the query object
    delete query.referrer_url;

    // Construct the final redirect URL with remaining query parameters
    const queryString = new URLSearchParams(encode(query));
    const redirectUrl = `http://localhost:3000?${queryString}`;

    // Redirect the user to the referral URL with the additional query parameters
    window.location.href = redirectUrl;
  }, [router]);

  return <div>Redirecting...</div>;
};

export default Redirect;
