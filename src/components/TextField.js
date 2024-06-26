const formClasses =
  'block w-full appearance-none rounded border border-gray-400 bg-white py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-gray-900 placeholder:text-gray-400 focus:border-black focus:outline-none focus:ring-black sm:text-sm'

const Label = ({ id, children }) => {
  return (
    <label
      htmlFor={id}
      className='mb-2 block text-sm font-semibold text-black'
    >
      {children}
    </label>
  )
}

const TextField = ({ id, label, type = 'text', className, isLoading, ...props }) => {
  return (
    <div className={className}>
      {label && <Label id={id}>{label}</Label>}
      <input id={id} type={type} {...props} className={`${formClasses} ${isLoading ? 'bg-slate-400' :'' }`} />
    </div>
  )
}

export default TextField
