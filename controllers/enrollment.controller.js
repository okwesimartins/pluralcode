const db = require("../models");
const Enrollment = db.enrollment;
const Course = db.course;
const Admin = db.admin;
exports.enrolStudent = async(req, res, next)=>{
     const {name, email, phone_number, course_of_interest, 
        mode_of_learning, class_format,country, cohort,currency,
        referral_code,reference_id,amount_paid,balance, program_type, payment_plan} = req.body;
        
       
        if(program_type == "cert"){
             if(!name || !reference_id || !email || !phone_number || !course_of_interest
               || !country || !currency ||
                !amount_paid){
                    return res.status(400).json({message:"All fields are required"})
                }
                await axios.get(`https://api.paystack.co/transaction/verify/${reference_id}`,    {
                    headers: {
                    authorization: "Bearer sk_test_0255f1f40367a9712aba18e65864b3440d10d879",
                 //replace TEST SECRET KEY with your actual test secret 
                 //key from paystack
                    "content-type": "application/json",
                    "cache-control": "no-cache",
                 },
                }).then((success)=>{
                 output=success;
                 }).catch((error)=>{
                 output=error;
                 });
                 //now we check for internet connectivity issues
                 if(!output.response && output.status!==200) {
              
                return  res.status(400).json({message: "Internet Error"});    
                 }
                 
                 //next,we confirm that there was no error in verification.
                 
                 if(output.response && !output.response.data.status){
                 
                    return  res.status(400).json({message: "Error Verifying Payment"})
                 }

            try{


                let date_ob = new Date();
                let date = ("0" + date_ob.getDate()).slice(-2);
                let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
                let year = date_ob.getFullYear();
                const date_recorded = year + "-" + month + "-" + date;

                const enrolmentRecords = {
                    name, 
                    email, 
                    phone_number, 
                    course_of_interest, 
                    mode_of_learning, 
                    class_format,
                    country, 
                    cohort,
                    currency,
                    referral_code,
                    amount_paid, 
                    payment_plan,
                    program_type,
                    payment_status: "complete"
                }

                await Enrollment.create(enrolmentRecords);

                
            }catch(error){
                return res.status(400).json({error});
            }
            return res.status(200).json({message:"Enrollment completed"})
        }


        if(program_type = "diploma"){

        }
}

//courses
exports.course = async (req, res, next)=>{
    let certresult =[];
    let diplomaresult = [];

const certificateCourses =  Course.findAll({attributes:['id','name','course_fee', 'part_payment', 'percentages'], 
    where: {
     course_type: "cert",
     status: "Active"
    }

});
const diplomaCourses =  Course.findAll({attributes:['id','name','course_fee', 'part_payment', 'percentages'], 
    where: {
     course_type: "diploma",
     status: "Active"
    }

});

//diploma courses
diplomaCourses.forEach(value => {
    const coursefeeVatNgn = Number(value.course_fee) * 0.007;
    const coursefeeTotalNgn = Number(value.course_fee) + coursefeeVatNgn;



    const part_payment_due_amount_ngn = Number(value.part_payment) * Number(value.percentages)

    const coursefeePartPaymentVat = part_payment_due_amount_ngn * 0.007;
    const coursefeeTotalPartPayment = part_payment_due_amount_ngn + coursefeePartPaymentVat;

    const adminDetails = Admin.findOne({ where: {
        access_level: 3,
       }})
    const courseFeeusd = Number(value.course_fee) / Number(adminDetails.exchange_rate)
    const coursefeeVatUsd = courseFeeusd * 0.007
    const coursefeeTotalUsd =  courseFeeusd +  coursefeeVatUsd;

    const coursePartFeeusd = Number(value.part_payment) / Number(adminDetails.exchange_rate)

    const part_payment_due_amount_usd = coursePartFeeusd * Number(value.percentages)

    const coursefeePartPaymentVatUsd = part_payment_due_amount_usd * 0.007;
    const coursefeeTotalPartPaymentUsd = coursefeePartPaymentVatUsd + part_payment_due_amount_usd;
    const courseData = {
     id : value.id,
     name : value.name,
     course_fee_ngn : value.course_fee,
     course_fee_vat_ngn : coursefeeVatNgn,
     course_fee_total_ngn : coursefeeTotalNgn,
     part_payment_ngn : value.part_payment,
     part_payment_due_amount_ngn: part_payment_due_amount_ngn,
     course_part_payment_fee_vat_ngn : coursefeePartPaymentVat,
     course_part_payment_total_ngn: coursefeeTotalPartPayment,
     
     course_fee_usd : courseFeeusd,
     course_fee_vat_usd : coursefeeVatUsd,
     course_fee_total_usd : coursefeeTotalUsd,
     part_payment_usd : coursePartFeeusd,
     part_payment_due_amount_usd: part_payment_due_amount_usd,
     course_part_payment_fee_vat_usd : coursefeePartPaymentVat,
     course_part_payment_total_usd: coursefeeTotalPartPaymentUsd,
     

    }
    diplomaresult.push(courseData )
})
//certification courses
    certificateCourses.forEach(value => {
        const coursefeeVatNgn = Number(value.course_fee) * 0.007;
        const coursefeeTotalNgn = Number(value.course_fee) + coursefeeVatNgn;



        const part_payment_due_amount_ngn = Number(value.part_payment) * Number(value.percentages)

        const coursefeePartPaymentVat = part_payment_due_amount_ngn * 0.007;
        const coursefeeTotalPartPayment = part_payment_due_amount_ngn + coursefeePartPaymentVat;

        const adminDetails = Admin.findOne({ where: {
            access_level: 3,
           }})
        const courseFeeusd = Number(value.course_fee) / Number(adminDetails.exchange_rate)
        const coursefeeVatUsd = courseFeeusd * 0.007
        const coursefeeTotalUsd =  courseFeeusd +  coursefeeVatUsd;

        const coursePartFeeusd = Number(value.part_payment) / Number(adminDetails.exchange_rate)

        const part_payment_due_amount_usd = coursePartFeeusd * Number(value.percentages)

        const coursefeePartPaymentVatUsd = part_payment_due_amount_usd * 0.007;
        const coursefeeTotalPartPaymentUsd = coursefeePartPaymentVatUsd + part_payment_due_amount_usd;
        const courseData = {
         id : value.id,
         name : value.name,
         course_fee_ngn : value.course_fee,
         course_fee_vat_ngn : coursefeeVatNgn,
         course_fee_total_ngn : coursefeeTotalNgn,
         part_payment_ngn : value.part_payment,
         part_payment_due_amount_ngn: part_payment_due_amount_ngn,
         course_part_payment_fee_vat_ngn : coursefeePartPaymentVat,
         course_part_payment_total_ngn: coursefeeTotalPartPayment,
         
         course_fee_usd : courseFeeusd,
         course_fee_vat_usd : coursefeeVatUsd,
         course_fee_total_usd : coursefeeTotalUsd,
         part_payment_usd : coursePartFeeusd,
         part_payment_due_amount_usd: part_payment_due_amount_usd,
         course_part_payment_fee_vat_usd : coursefeePartPaymentVat,
         course_part_payment_total_usd: coursefeeTotalPartPaymentUsd,
         

        }
        certresult.push(courseData )
    })

   return  res.status(200).json({diploma: diplomaresult, certificate: certresult});
}