import {cva} from 'class-variance-authority';


export default function Button({variant,type='submit',action,...props}) {
  return (
    <button {...props} className={buttonVariants({variant})} type={type} onClick={action}/>
  )
}

const buttonVariants=cva(
    'px-4 py-2 rounded-lg font-semibold text-white w-full my-1 mx-1',
    {
        variants:{
            variant:{
                primary:'bg-green-500 hover:bg-green-700',
                secondary:'bg-blue-500 hover:bg-blue-700',
                warning:'bg-yellow-500 hover:bg-yellow-700',
                delete:'bg-red-500 hover:bg-red-700'
            },
        },
        defaultVariants:{
            variant:'primary'
        }
    }
)
