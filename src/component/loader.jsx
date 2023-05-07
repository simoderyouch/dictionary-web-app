function Loading({ loading, error, children,data }) {
    console.log("data : " , data)
  return (
    <>
      {loading ? (
        <div className="rolling">
            <div class="loadingio-spinner-rolling-234cmcgj7ue"><div class="ldio-rkai90ip6f">
<div></div>
</div></div>
        </div>
      ) : error ? (
        <main className="error">
          <img src="./assets/images/error.svg" alt="" />
          <h5>{data.title}</h5>
          <p>
            {data.message} {data.resolution}
          </p> 
        </main>
      ) :  !(data == null)   ? (
         
          children
        
      ) : ''}
    </>
  );
}

export default Loading;
