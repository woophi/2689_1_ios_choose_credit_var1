declare global {
  interface Window {
    dataLayer: unknown[];
  }
}
export const sendDataToGA = async ({
  creditPeriod,
  creditSum,
  offer,
  overpaymentSum,
  paymentSum,
}: {
  creditSum: number;
  paymentSum: number;
  creditPeriod: number;
  overpaymentSum: number;
  offer: string;
}) => {
  try {
    const now = new Date();
    const date = `${now.getFullYear()}-${
      now.getMonth() + 1
    }-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    await fetch(
      'https://script.google.com/macros/s/AKfycbwkZc-Qa7Kjr-sg8roVOAxHY5_WipUYkiAL5bfPRfC9C-e10m5PvnWMCtGQQy9O3B5B/exec',
      {
        redirect: 'follow',
        method: 'POST',
        body: JSON.stringify({
          date,
          credit_sum: creditSum,
          payment_sum: paymentSum,
          credit_period: creditPeriod,
          overpayment_sum: overpaymentSum,
          offer,
          variant: '2689_1_ios_choose_credit_var1',
        }),
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
      },
    );
  } catch (error) {
    console.error('Error!', error);
  }
};
