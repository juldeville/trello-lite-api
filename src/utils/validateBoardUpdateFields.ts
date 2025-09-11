function validateBoardUpdateFields(body: any) {
  const errors: string[] = [];
  const data: any = {};

  if ("name" in body) {
    if (typeof body.name !== "string" || body.name.trim() === "") {
      errors.push("Invalid name");
    } else {
      data.name = body.name;
    }
  }

  if ("members" in body) {
    if (!Array.isArray(body.members)) {
      errors.push("Invalid members");
    } else {
      data.members = body.members;
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    data,
  };
}

export default validateBoardUpdateFields;
