import { Typography, Icon, Grid } from '@material-ui/core'
import './Card.scss'

function CCard (props) {
  const { icon, color, title, highlightText, titleColor, highlightTextColor, children } = props
  
  return (
    <div className={'Card ' + color}>
      <div>
        {children ? {children} :
          <div>
            <Grid container direction="row" alignItems="center">
              <Grid items style={{ marginRight: '16px' }}>
                <Icon style={{
                  color: 'white',
                  fontSize: '40px'
                }}>{icon}</Icon>
              </Grid>
              <Grid items>
                <Grid container direction="column">
                  <Typography variant="h6">
                    <div style={{
                      color: titleColor
                    }}>
                      {title}
                    </div>
                  </Typography>
                  <Typography variant="h3">
                    <div style={{
                      color: highlightTextColor
                    }}>
                      <b>{highlightText}</b>
                    </div>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </div>
        }
      </div>
    </div>
  )
}

export default CCard
