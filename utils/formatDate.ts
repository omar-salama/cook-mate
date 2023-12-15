export default function formatDate(inputDate: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  };

  return inputDate.toLocaleDateString('en-US', options);
}
