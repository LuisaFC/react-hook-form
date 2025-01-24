import { useForm } from "react-hook-form"
import { Input } from "./components/ui/input"
import { ErrorMessage } from '@hookform/error-message';
import { Button } from "./components/ui/button";

interface IFormData {
    name: string;
    age: number;
}

function App() {
  console.log("App renderizou")

  //handleSubmit -> submit function
  //register -> input register anda validation
  //formState -> form infos

  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    formState,
    clearErrors
  } = useForm<IFormData>()

  const handleSubmit = hookFormHandleSubmit(
    (data) => {
      console.log("Esse é o onValid")
      console.log("data", {data: data})
    },
    (errors) => {
      console.log("errors", errors)
    }
	)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 w-96"
      >
        <div>
          <Input
            placeholder="Nome"
            {...register('name',{
              required: {
                value: true,
                message: "O nome é obrigatório"
              }
            })}
          />
          <ErrorMessage
            errors={formState.errors}
            name="name"
            render={({ message }) => <small className="text-red-400 block">{message}</small>}
          />
        </div>

        <div>
          <Input
            type="number"
            placeholder="Idade"
            {...register('age', {
              required: {
                value: true,
                message: "A idade é obrigatória"
              }
            })}
          />
          <ErrorMessage
            errors={formState.errors}
            name="age"
            render={({ message }) => <small className="text-red-400 block">{message}</small>}
          />
        </div>

        <Button className="mt-4">
          Enviar
        </Button>

        <div>
          <Button
            size="sm"
            type="button"
            variant="outline"
            onClick={() => clearErrors()}>
              Limpar Erros
          </Button>
        </div>
      </form>
    </div>
  );
}

export default App
