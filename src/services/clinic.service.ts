import api from "./api";

interface CreateClinicPayload {
  hospital_name: string;
  license_name: string;
  doctor_name: string;
  contact_number: string;
  email: string;
  clinic_address: string;
}

/* CREATE */
export const createClinicService = async (payload: CreateClinicPayload) => {
  const res = await api.post("/super-admin/clinics", payload);
  return res.data;
};

/* GET ALL */
export const getClinicsService = async () => {
  const res = await api.get("/super-admin/clinics");
  return res.data;
};

/* DELETE */
export const deleteClinicService = async (id: number) => {
  const res = await api.delete(`/super-admin/clinics/${id}`);
  return res.data;
};

/* UPDATE (EDIT) */
export const updateClinicService = async (id: number, payload: any) => {
  const res = await api.put(`/super-admin/clinics/${id}`, payload);
  return res.data;
};

/* ACTIVATE / DEACTIVATE */
export const toggleClinicStatusService = async (
  id: number,
  is_active: boolean,
) => {
  const res = await api.put(`/super-admin/clinics/${id}`, {
    is_active,
  });
  return res.data;
};
