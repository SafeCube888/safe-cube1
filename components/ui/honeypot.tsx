export function HoneypotField() {
  return (
    <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: '-9999px' }} tabIndex={-1}>
      <label htmlFor="company_website">Website (leave blank)</label>
      <input
        type="text"
        id="company_website"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
    </div>
  );
}
