import { useEffect, useState } from "react";
import { Save, Building2 } from "lucide-react";
import api from "../services/api";
import toast, { Toaster } from "react-hot-toast";

export default function AddClinic() {
  const [doctorName, setDoctorName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");

  const [editingClinicId, setEditingClinicId] = useState<number | null>(null);

  const [loading, setLoading] = useState(false);
  const [clinics, setClinics] = useState<any[]>([]);

  /* =======================
     GET CLINIC LIST
  ======================== */
  const fetchClinics = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const res = await api.get("/super-admin/clinics", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data?.success) {
        setClinics(res.data.data);
      }
    } catch {
      toast.error("Failed to load clinics");
    }
  };

  useEffect(() => {
    fetchClinics();
  }, []);

  /* =======================
     RESET FORM
  ======================== */
  const resetForm = () => {
    setDoctorName("");

    setContactNumber("");
    setEmail("");
    setWebsite("");
    setAddress("");
    setEditingClinicId(null);
  };

  /* =======================
     CREATE / UPDATE
  ======================== */
  const handleSave = async () => {
    if (!doctorName || !contactNumber || !email || !address) {
      toast.error("All required fields must be filled");
      return;
    }

    const token = localStorage.getItem("access_token");

    const payload = {
      doctor_name: doctorName.trim(), // create only
      contact_number: contactNumber.trim(),
      email: email.trim().toLowerCase(),
      clinic_address: address.trim(),
    };

    setLoading(true);

    try {
      if (editingClinicId) {
        // UPDATE
        await api.put(
          `/super-admin/clinics/${editingClinicId}`,
          {
            doctor_name: payload.doctor_name,
            contact_number: payload.contact_number,
            email: payload.email,
            clinic_address: payload.clinic_address,
          },
          { headers: { Authorization: `Bearer ${token}` } },
        );

        toast.success("Clinic updated successfully ✅");
      } else {
        // CREATE
        await api.post("/super-admin/clinics", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });

        toast.success("Clinic created successfully ✅");
      }

      resetForm();
      fetchClinics();
    } catch (err: any) {
      toast.error(
        err?.response?.data?.error ||
          err?.response?.data?.message ||
          "Operation failed",
      );
    } finally {
      setLoading(false);
    }
  };

  /* =======================
     EDIT
  ======================== */
  const handleEdit = (c: any) => {
    setEditingClinicId(c.id);

    setDoctorName(
      c.doctor?.first_name
        ? `${c.doctor.first_name} ${c.doctor.last_name || ""}`.trim()
        : "",
    );

    setContactNumber(c.contact_number || "");
    setEmail(c.email || "");
    setAddress(c.clinic_address || "");

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* =======================
     DELETE
  ======================== */
  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this clinic?")) return;

    try {
      await api.delete(`/super-admin/clinics/${id}`);
      toast.success("Clinic deleted");
      fetchClinics();
    } catch {
      toast.error("Delete failed");
    }
  };

  /* =======================
     ACTIVATE / DEACTIVATE
  ======================== */
  // const handleToggleStatus = async (id: number, active: boolean) => {
  //   try {
  //     await api.put(`/super-admin/clinics/${id}`, {
  //       is_active: !active,
  //     });
  //     toast.success(active ? "Clinic deactivated" : "Clinic activated");
  //     fetchClinics();
  //   } catch {
  //     toast.error("Status update failed");
  //   }
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-3 sm:p-4 md:p-6">
      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 md:space-y-10">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
          <div className="p-2 sm:p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-md flex-shrink-0">
            <Building2 size={20} className="sm:w-6 sm:h-6" />
          </div>

          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text text-transparent break-words">
              Add New Doctor
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Super Admin can create and manage Doctors
            </p>
          </div>
        </div>

        {/* FORM */}
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-5 md:p-6 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
            {/* <input
              value={clinicName}
              onChange={(e) => setClinicName(e.target.value)}
              placeholder="Clinic / Hospital Name"
              className="w-full px-3 sm:px-4 py-2 rounded-md border border-gray-400 text-gray-900 placeholder-gray-400 text-sm sm:text-base focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600 outline-none transition"
            /> */}
            <input
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
              placeholder="Head Doctor Name"
              className="w-full px-3 sm:px-4 py-2 rounded-md border border-gray-400 text-gray-900 placeholder-gray-400 text-sm sm:text-base focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600 outline-none transition"
            />
            {/* <input
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value)}
              placeholder="Registration Number"
              className="w-full px-3 sm:px-4 py-2 rounded-md border border-gray-400 text-gray-900 placeholder-gray-400 text-sm sm:text-base focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600 outline-none transition"
            /> */}
            <input
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              placeholder="Contact Number"
              className="w-full px-3 sm:px-4 py-2 rounded-md border border-gray-400 text-gray-900 placeholder-gray-400 text-sm sm:text-base focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600 outline-none transition"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full px-3 sm:px-4 py-2 rounded-md border border-gray-400 text-gray-900 placeholder-gray-400 text-sm sm:text-base focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600 outline-none transition"
            />
            <input
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="Website (optional)"
              className="w-full px-3 sm:px-4 py-2 rounded-md border border-gray-400 text-gray-900 placeholder-gray-400 text-sm sm:text-base focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600 outline-none transition"
            />
          </div>

          <textarea
            rows={3}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Clinic Address"
            className="w-full mt-3 sm:mt-4 px-3 sm:px-4 py-2 rounded-md border border-gray-400 text-gray-900 placeholder-gray-400 text-sm sm:text-base focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600 outline-none transition"
          />

          <div className="flex justify-end mt-4 sm:mt-6">
            <button
              disabled={loading}
              onClick={handleSave}
              className="flex items-center gap-2 px-4 sm:px-6 py-2 bg-cyan-700 text-white text-sm sm:text-base rounded-md hover:bg-cyan-800 disabled:opacity-60 transition font-medium whitespace-nowrap"
            >
              <Save size={16} className="flex-shrink-0" />
              {loading
                ? "Saving..."
                : editingClinicId
                ? "Update Doctor"
                : "Create Doctor"}
            </button>
          </div>
        </div>

        {/* CLINIC LIST */}
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-5 md:p-6 w-full">
          <h2 className="text-lg sm:text-xl font-bold mb-4 text-gray-800">
            Clinic List
          </h2>

          {/* Mobile View (Cards) */}
          <div className="block md:hidden space-y-4">
            {clinics.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No clinics found
              </div>
            ) : (
              clinics.map((c) => (
                <div
                  key={c.id}
                  className="border border-gray-200 rounded-lg p-4 space-y-3"
                >
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">Hospital</p>
                      <p className="font-medium text-sm sm:text-base break-words">
                        {c.hospital_name || "-"}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded-full whitespace-nowrap flex-shrink-0 ${
                        c.is_active
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {c.is_active ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-xs text-gray-500">Doctor</p>
                      <p className="break-words">
                        {c.doctor?.first_name
                          ? `${c.doctor.first_name} ${c.doctor.last_name || ""}`
                          : "-"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Contact</p>
                      <p className="break-words">{c.contact_number || "-"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="truncate text-xs sm:text-sm">
                        {c.email || "-"}
                      </p>
                    </div>
                    <div>
                      <p className="break-words text-xs">
                        {c.license_name || "-"}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-200 flex gap-2">
                    <button
                      onClick={() => handleEdit(c)}
                      className="flex-1 px-3 py-2 text-xs rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 transition font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="flex-1 px-3 py-2 text-xs rounded-md bg-red-100 text-red-700 hover:bg-red-200 transition font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Desktop View (Table) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border border-gray-300 text-sm">
              <thead className="bg-gray-200 text-gray-800">
                <tr>
                  <th className="p-3 text-left font-semibold">Doctor</th>
                  <th className="p-3 text-left font-semibold">Email</th>
                  <th className="p-3 text-left font-semibold">Contact</th>
                  <th className="p-3 text-left font-semibold">AE Title</th>

                  <th className="p-3 text-left font-semibold">MWL Port</th>
                  <th className="p-3 text-left font-semibold">Storage Port</th>
                  <th className="p-3 text-left font-semibold">Status</th>
                  <th className="p-3 text-left font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody>
                {clinics.map((c) => (
                  <tr
                    key={c.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-3">
                      {c.doctor?.first_name
                        ? `${c.doctor.first_name} ${c.doctor.last_name || ""}`
                        : "-"}
                    </td>
                    <td className="p-3 truncate">{c.email || "-"}</td>
                    <td className="p-3">{c.contact_number || "-"}</td>
                    <td className="p-3 font-mono text-indigo-700">
                      {c.ae_title || "-"}
                    </td>

                    <td className="p-3">{c.dicom_mwl_port || "-"}</td>
                    <td className="p-3">{c.dicom_storage_port || "-"}</td>
                    <td className="p-3">
                      {c.is_active ? (
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700 font-medium">
                          Active
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs rounded-full bg-gray-200 text-gray-600 font-medium">
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(c)}
                          className="px-3 py-1 text-xs rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 transition font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(c.id)}
                          className="px-3 py-1 text-xs rounded-md bg-red-100 text-red-700 hover:bg-red-200 transition font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {clinics.length === 0 && (
            <div className="hidden md:block text-center py-8 text-gray-500">
              No clinics found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
