import path from "path";

export function getDashboard(req, res) {
  const role = req.user.role;

  const roleMap = {
    "buyer": "dashboard-student.html",
    "seller": "dashboard-admin.html",
    "wholesaler": "dashboard-wholesaler.html",
    "retailer": "dashboard-retailer.html",
  };

  const file = roleMap[role];
  if (!file) {
    return res.status(404).json({ success: false, message: "Dashboard not found" });
  }

  res.sendFile(path.resolve(`views/${file}`));
}
