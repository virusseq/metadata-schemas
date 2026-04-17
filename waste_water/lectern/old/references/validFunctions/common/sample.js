// THIS IS A SAMPLE VALIDATION

const validation = () =>
  function validate(inputs) {
    const { $row, $name, $field } = inputs;
    let result = { valid: true, message: "Ok" };

    // DO SOME VALIDATION HERE

    return result;
  };

export default validation;
