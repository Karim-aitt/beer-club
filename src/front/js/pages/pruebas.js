<form className="" method="POST" action="https://3001-karimaitt-beerclub-rgk13idq1ch.ws-eu54.gitpod.io/api/beers" encType="multipart/form-data">
<input
  className="m-2 p-1"
  type="text"
  placeholder="Beer Name"
  onChange={(e) => setNombre(e.target.value)}
  value={nombre}
  required
  name="name"
></input>
<input
  className="m-2 p-1"
  type="text"
  placeholder="Smell"
  onChange={(e) => setAroma(e.target.value)}
  value={aroma}
  required
  name="smell"
></input>
<input
  className="m-2 p-1"
  type="text"
  placeholder="Alcohol"
  onChange={(e) => setAlcohol(e.target.value)}
  value={alcohol}
  required
  name="alcohol"
></input>
<input
  className="m-2 p-1"
  type="text"
  placeholder="Owner / Company"
  onChange={(e) => setAutor(e.target.value)}
  value={autor}
  required
  name="company"
></input>
<input
  className="ms-2 p-1"
  type="text"
  placeholder="Source"
  onChange={(e) => setSource(e.target.value)}
  value={source}
  name="source"
></input>

<select
  className="m-2 p-1"
  id="selectCategory"
  name="category"
  placeholder="Category"
  onChange={(e) => setCategory(e.target.value)}
  
>
  {store.categories.length > 0 ? (
    store.categories.map((elem, i) => {
      return (
        <option key={i} value={elem.id}>
          {elem.name}
        </option>
      );
    })
  ) : (
    <option>Loading...</option>
  )}
</select>

<textarea
  className="m-2 p-1 inputStyle"
  rows="4"
  cols="40"
  placeholder="Description"
  onChange={(e) => setDescrip(e.target.value)}
  value={descrip}
  name="description"
></textarea>

<input
  className="m-2 p-1"
  type="file"
  // placeholder="url de tu imagen"
  name="file"
  onChange={(e) => setImagen(e.target.files[0])}
  // value={imagen}
></input>
<input 
type="hidden"
name="user_id"
value={store.user_id} />
<input
  type="submit"
  className="btn btn-dark"
  // value="enviar"
  onClick={() => {
    const modal = document.getElementById("createbeerModal")
    const m = bootstrap.Modal.getInstance(modal)
    m.hide()
  }}
/>

</form>