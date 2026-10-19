/** Locale-aware "Aug 2026" / "ago 2026" formatting for "YYYY-MM" values. */
export function formatMonthYear(intlLocale: string, value: string): string {
  const [year, month] = value.split("-").map(Number);
  const monthName = new Intl.DateTimeFormat(intlLocale, { month: "short", timeZone: "UTC" })
    .format(new Date(Date.UTC(year, month - 1, 1)))
    .replace(/\.$/, "");
  return `${monthName} ${year}`;
}

export function formatPeriod(intlLocale: string, start: string, end: string): string {
  return `${formatMonthYear(intlLocale, start)} – ${formatMonthYear(intlLocale, end)}`;
}
