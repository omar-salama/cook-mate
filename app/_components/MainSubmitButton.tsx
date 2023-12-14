const MainSubmitButton = ({
  label,
  loading = false,
}: {
  label: string;
  loading: boolean;
}) => {
  return (
    <button
      className={`w-full rounded-full bg-secondary hover:bg-secondary/[.9] text-white font-bold py-2 ${
        loading ? 'cursor-wait bg-secondary/[.6] hover:bg-secondary/[.6]' : ''
      }`}
      type='submit'
      disabled={loading}
    >
      {label}
    </button>
  );
};

export default MainSubmitButton;
