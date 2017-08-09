exports.maybeRequired = req => input => (req ? input.required() : input);
