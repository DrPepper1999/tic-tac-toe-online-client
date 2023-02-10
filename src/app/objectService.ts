export function deleteEmptyField(action: any) {
    Object.keys(action.payload).forEach(
      (key) => action.payload[key] === null && delete action.payload[key]
    );
  }