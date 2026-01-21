// frontend/assets/js/services/profileService.js
// Service for fetching user profile data

export async function fetchUserById(userId) {
  try {
    const res = await fetch(`/api/users/${userId}`);
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

export async function fetchActivitiesForUser(userId) {
  try {
    const res = await fetch(`/api/activities`);
    if (!res.ok) return [];
    const all = await res.json();
    return (all || []).filter((r) => Number(r.user_id) === Number(userId));
  } catch (error) {
    console.error("Error fetching activities:", error);
    return [];
  }
}

export async function fetchMedicalForUser(userId) {
  try {
    const res = await fetch(`/api/medical`);
    if (!res.ok) return [];
    const all = await res.json();
    return (all || []).filter((r) => Number(r.user_id) === Number(userId));
  } catch (error) {
    console.error("Error fetching medical records:", error);
    return [];
  }
}