
export async function POST(req) {
  const { usernames } = await req.json(); // array of usernames
  const password = "@STUDENTs1"; // default password siswa
  const service = "smart_service"; 

  const tokenResults = [];

  for (const username of usernames) {
    const params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);
    params.append("service", service);

    const res = await fetch("https://smartprivate.web.id/login/token.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    const data = await res.json();
    tokenResults.push({
      username,
      token: data.token || null,
      error: data.error || null,
    });
  }

  return Response.json({ results: tokenResults });
}
