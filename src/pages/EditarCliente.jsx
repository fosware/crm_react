import { useNavigate, Form, useLoaderData, useActionData, redirect } from "react-router-dom";
import Formulario from "../components/Formulario";
import { obtenerCliente, actualizarCliente } from "../data/clientes"
import Error from "../components/Error";

export async function loader({params}) {
   const cliente = await obtenerCliente(params.clienteId)
   if(Object.values(cliente).length === 0) {
    throw new Response('', {
        status: 404,
        statusText: 'El Cliente no fue encontrado'
    })
   }
   return cliente
}

export async function action({request, params}) {

    
    const formData = await request.formData();
    const datos = Object.fromEntries(formData);
    const email = formData.get("email");

    // validación
    const errores = [];
    if (Object.values(datos).includes("")) {
        errores.push("Todos los campos son obligatorios");
    }

    // validar email

    let regex = new RegExp(
        "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
    );

    if (!regex.test(email)) {
        errores.push("El email no es válido");
    }

    // Retornar datos si hay errores
    if (Object.keys(errores).length) {
        return errores;
    }
    // actualizar cliente
    await actualizarCliente( params.clienteId, datos)
    return redirect('/')
}

function EditarCliente() {

    const navigate = useNavigate()
    const cliente = useLoaderData()
    const errores = useActionData()

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
      <p className="mt-3">
        Modifica la información de un Cliente
      </p>

      <div className="flex justify-end md:max-w-[87%]">
        <button
          className="bg-blue-800 text-white px-4 py-2 font-bold uppercase rounded-md"
          onClick={() => navigate("/")}
        >
          Volver
        </button>
      </div>
      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-10">
        {  errores?.length && errores.map((error, i) => <Error key={i}>{error}</Error>) } 

        <Form method="POST" noValidate>
          <Formulario 
            cliente={cliente}
          />
          <input
            type="submit"
            className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white texr-lg rounded-md"
            value="Guardar cambios"
          ></input>
        </Form>
      </div>
    </>
  )
}

export default EditarCliente