import React from 'react'
import logo from '../../assets/tup.PNG';

export default function EmailTemplate() {
  return (
    <>
   <style>
        {`
          @media only screen and (max-width: 768px) {
            .email-box {
              width: 100% !important;
              padding: 1rem !important;
            }
          }
          
          .email-box {
            width: 75%;
          }
          
        `}
      </style>
    <div className="email-container" style={{ display: 'flex', minHeight: '100vh', padding: '4rem', backgroundColor: '#f6f8fc' }}>
  <div className='email-box' style={{ margin: 'auto', padding: '4rem', backgroundColor: '#fff', boxShadow: '5px 5px 10px #8ca0aa', borderRadius: '5px' }}>
    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
      <img className='logo' src={logo} alt="logo" style={{ margin: 'auto', width: '80px' }} />
    </div>
    <h3 style={{ color: '#08354c' }}>مرحبا..</h3>
    <h6 style={{ color: '#08354c' }}>من فضلك اضغط فوق الزر بالأسفل للتحقق من عنوان بريدك الإلكتروني.</h6>
    <div style={{ textAlign: 'center', paddingBottom: '3rem' }}>
      <button className='btn-email' style={{ marginTop: '2rem', color: '#fff', backgroundColor: '#08354c', display: 'inline-block', padding: '.5rem 1rem', fontSize: '1rem', fontWeight: 400, textAlign: 'center', whiteSpace: 'nowrap', verticalAlign: 'middle', cursor: 'pointer', border: '1px solid transparent', borderRadius: '.25rem', transition: 'color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out' }}>
        توثيق البريد الالكترونى
      </button>
    </div>
    <h6 style={{ color: '#08354c' }}>إذا لم تقم بإنشاء حساب ، فلا داعي لاتخاذ أي إجراء آخر.</h6>
  </div>
</div>

    </>
  )
}
