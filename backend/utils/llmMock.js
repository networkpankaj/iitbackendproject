exports.mockLLMResponse = (message) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ response: `Mock response to: ${message}` });
      }, 2000);
    });
  };