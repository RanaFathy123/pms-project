import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import img1 from "../../../../assets/images/PMS 3.png";
import { axiosInstance } from '../../../../axiosConfig/axiosInstance';

export default function VerifyAccount() {

    const { handleSubmit, register,formState: { errors  ,isDirty ,isValid} } = useForm();
  const Navigate=  useNavigate()

    async function onSubmit (data:any) {
        try {
            const res = await axiosInstance.put(`/Users/verify`, data);
            console.log(res);
            toast.success(res?.data?.message || 'your account has benn verified')
            Navigate('/login')
        } catch (error:any) {
            console.log(error);
            toast.success(error?.res?.data?.message || "there's an error" )

        }
        
    }

    return (
     <>
        <div className="Auth-container">
            <div className="container-fluid ">
                <div className="row justify-content-center align-items-center min-vh-100">
                    <div className="col-md-6">
                        <div className="image text-center">
                            <img src={img1} alt="" />
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className='p-5 rounded-4 my-5'>
                            <div className="text text-white ms-3">
                                <p className='text-Auth'>Welcome to PMS</p>
                                <h2>Verify Account</h2>
                            </div>
                            <div className="row">
      
                                <div className="col-md-12 ">
                                    <div className="input m-3">
                                        <label className='my-1'>Email</label>
                                        <input type="email" className='form-control p-0' placeholder='Enter Your E-mail' {...register('email', { required: 'Email is required', pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Email is invalid' } })} />
                                        {errors.email && <div className="alert alert-danger p-2 my-3">{errors?.email?.message?.toString()}</div>}
                                    </div>
                                </div>
            <div className="col-md-12 ">
              <div className="input m-3">
              <label className='my-1' >Code</label>
              <input type="text" className='form-control p-0' placeholder='Enter Your Code'
               {...register('code', {
                required: 'Code is required',        
              })}
              />
              {errors.code && <div className="alert alert-danger p-2 my-3">{errors?.code?.message?.toString()}</div>}

              </div>
            </div>
          
          </div>
          <div className="button">
          <div className="d-grid gap-2 col-5 mx-auto my-3">
  <button className="btn text-white rounded-pill submit" type="submit"  disabled={!isDirty || !isValid}>Save</button>
</div>
          </div>
         </form>
         </div>
         
        
         </div>
      </div>
    </div>
     </>
  )
}

