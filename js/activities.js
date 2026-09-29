const featureForKind = { GARDEN: "garden", HIKING: "hike", CYCLING: "cycle" };

export function orderedActivities(activities, desiredFeatures) {
  const preferred = activities.filter((activity) => desiredFeatures.includes(featureForKind[activity.kind]));
  return [...preferred, ...activities.filter((activity) => !preferred.includes(activity))];
}
