export function initMedicalController() {
  const form = $("medicalForm");
  const cancelBtn = $("cancelBtn");

  // ✅ FIXED
  if (!form || !cancelBtn) return;

  loadMedical();

  form.onsubmit = async e => {
    e.preventDefault();

    const data = {
      user_id: $("user_id").value,
      disease: $("disease").value,
      disease_type: $("disease_type").value,
      genetic: $("genetic").value,
      notes: $("notes").value
    };

    const { editingId } = getState();

    editingId
      ? await api.apiUpdate(editingId, data)
      : await api.apiCreate(data);

    showAlert("Medical record saved");
    resetMedicalForm();
    setState({ editingId: null });
    loadMedical();
  };

  cancelBtn.onclick = () => {
    resetMedicalForm();
    setState({ editingId: null });
  };
}



