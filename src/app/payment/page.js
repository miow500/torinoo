import Link from "next/link";

function PaymentPage({ searchParams }) {

  if (searchParams?.status === "success")
    return (
      <div>
        <p>پرداخت شما با موفقیت انجام شد</p>
        <Link href="/profile/my-tours">برو به پروفایل</Link>
      </div>
    );

  return (
    <div>
      <p>پرداخت انجام نشد</p>
    </div>
  );
}

export default PaymentPage;
