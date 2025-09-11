function validateBoardBody(body: any) {
  const errors: string[] = [];
  if (!body.name || typeof body.name !== "string" || !body.name.trim()) {
    errors.push("Invalid board name");
  }
  if (body.name.length > 80) {
    errors.push("Board name exceeds maximum length of 80 characters");
  }
  if (body.members && !Array.isArray(body.members)) {
    errors.push("Members must be an array of user IDs");
  }
  return {
    valid: errors.length === 0,
    errors,
    data: {
      name: body.name?.trim(),
      members: Array.isArray(body.members) ? body.members : [],
    },
  };
}
export default validateBoardBody;
