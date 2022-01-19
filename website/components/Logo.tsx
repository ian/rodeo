type Props = {
  className?: string
}

const Logo = (props: Props) => {
  const { className } = props
  return (
    <a href="#">
      <img
        src={require('../assets/logo.svg')}
        alt="Rodeo"
        className={className}
      />
    </a>
  )
}

export default Logo
