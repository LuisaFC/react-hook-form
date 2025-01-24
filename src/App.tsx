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
  //formState.isDirty -> detectar alterações nos campos
  //formState.dirtyFields -> verifica quais campos foram alterados

  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    formState,
    clearErrors
  } = useForm<IFormData>({
    defaultValues: {
      name: "",
      age: 0
    }
  })

  const handleSubmit = hookFormHandleSubmit(
    (data) => {
      console.log("Esse é o onValid")
      console.log("data", {data: data})
    },
    (errors) => {
      console.log("errors", errors)
    }
	)

  //verificar se teve campo alterado
  const isDirty = Object.keys(formState.dirtyFields).length > 0

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
            render={({ message }) =>
              <small className="text-red-400 block">{message}</small>}
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
              },
              setValueAs: (age) => Number(age)
            })}
          />
          <ErrorMessage
            errors={formState.errors}
            name="age"
            render={({ message }) => <small className="text-red-400 block">{message}</small>}
          />
        </div>

        <div className="flex mt-4 gap-2">
          <Button
            className="flex-1"
            disabled={!isDirty}>
            Salvar
          </Button>

          <Button
            className="flex-1"
            disabled={isDirty}>
            Enviar
          </Button>
        </div>

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
