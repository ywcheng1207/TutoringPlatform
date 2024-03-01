const Footer = () => {
  
  return (
    <div className="bg-[#D9D9D9] h-[150px] flex flex-col justify-center items-center gap-5 py-5 md:flex-row">
      <div>
        © 2024 All rights reserved
      </div>
      <div className="flex flex-col items-center gap-2 md:flex-row">
        <h6>作者</h6>
       <div className="flex gap-3">
          <div className="w-[50px] h-[50px] bg-[#FEE3E3] rounded-full"></div>
          <div className="w-[50px] h-[50px] bg-[#FEE3E3] rounded-full"></div>
       </div>
      </div>
    </div>
  )
}

export default Footer
