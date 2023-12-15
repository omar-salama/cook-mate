export default function formatDate(inputDate: string | undefined): string {
  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  };
  if (!inputDate) return '';
  const date = new Date(inputDate);
  return date.toLocaleDateString('en-US', options);
}
