const EmployeeCard = ({item}) => {
    return(
        <article
        tabIndex={0}
        className="group mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-white/40 bg-white/65"
      >
        <div className="space-y-3 p-4 text-left">
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-xl font-semibold leading-tight text-gray-900">
              {item.name + item.lastName}
            </h2>
            <span className="rounded-full bg-amber 100/80 px-3 py-1 text-xs font-semibold text-amber-800 backdrop-blur-sm transition-all duration-300 hover:gb-amber-200/90">
              {item.name + item.lastName || "Nombre no disponible"}
            </span>
          </div>
          <p className="text-sm-slate-600">
            {item.salary || "Salario no disponible"}
          </p>
          <div className="grid gap-2 text-sm text-slate-600">
            <p className="rounded-full bg-slate-100/75 px-3 py-2">
              <span className="font-bold text-slate-800">DUI:</span>
              {item.DUI}
            </p>
            <p className="rounded-full bg-slate-100/75 px-3 py-2">
              <span className="font-bold text-slate-800">Telefono:</span>
              {item.phone}
            </p>
            <p className="rounded-full bg-slate-100/75 px-3 py-2">
              <span className="font-bold text-slate-800">Email:</span>
              {item.email}
            </p>
            <p className="rounded-full bg-slate-100/75 px-3 py-2">
              <span className="font-bold text-slate-800">Ramas:</span>
              {item.IdBranches}
            </p>
            <p className="rounded-full bg-slate-100/75 px-3 py-2">
              <span className="font-bold text-slate-800">Verificación:</span>
              {item.isVerified}
            </p>
          </div>
        </div>
      </article>
    )
}
/**
 *     name:{
        type: String
    },
    lastName:{
        type: String
    },
    salary:{
        type: Number
    },
    DUI:{
        type: String
    },
    phone:{
        type: String
    },
    email:{
        type: String
    },
    password:{
        type: String
    },
    IdBranches:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Branches"
    },
    isVerified:{
        type: Boolean
    }
 */

export default EmployeeCard