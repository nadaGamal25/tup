import React from 'react'

export default function GltShipments() {
  return (
    <div className='p-5' id='content'>
        <h3>
            شحنات شركة glt
        </h3>
        <div className="clients-table p-4 mt-4">
        <table className="table">
        <thead>
    <tr>
      <th scope="col">اسم العميل</th>
      <th scope="col">قيمة الشحنة</th>
      <th scope="col">الكمية</th>
      <th scope="col">فاتورة الشحن</th>
      <th scope="col">تاريخ الاستلام</th>
      <th scope="col">الحالة</th>
      <th scope="col">رقم الفاتورة</th>
      <th scope="col">الاجراءات</th>

    </tr>
  </thead>
  </table>
  </div>
</div>
  )
}
