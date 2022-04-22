function useShareForm() {
  const copyLinkToClipboard = formId => {
    // TODO: replace window.location.href with env variable for production
    const baseUrl = window.location.origin;
    const route = '/forms/' + formId;
    const url = baseUrl + route;

    return navigator?.clipboard?.writeText(url);
  };

  return {
    copyLinkToClipboard,
  };
}
export default useShareForm;
