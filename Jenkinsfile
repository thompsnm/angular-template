node() {

  checkout scm
  def appImage
  def buildImage = docker.image('thompsnm/nodejs-chrome:carbon')
  def testImage = docker.image('thompsnm/nodejs-chrome-xvfb:carbon')
  buildImage.pull()
  testImage.pull()

  buildImage.inside('-v /etc/passwd:/etc/passwd') {

    withEnv([
      // Override the npm cache directory to avoid: EACCES: permission denied, mkdir '/.npm'
      'npm_config_cache=npm-cache'
    ]) {

      stage('Install Dependencies') {
        sh 'npm install'
      }

      stage('Lint') {
        sh 'npm run lint'
      }

      stage('Unit Test') {
        sh 'npm run test:coverage'
      }

      stage('Build') {
        sh 'npm run build'
      }

    }

  }

  stage('Build Docker Image') {
    appImage = docker.build('angular-template')
  }

  stage('E2E Test') {
    docker.image(appImage.id).withRun {c ->
      // Not reusing the existing "npm run e2e:docker" script because ${PWD} and ${WORKSPACE} do not map to the same location in Jenkins
      sh "docker run --rm -v ${WORKSPACE}:/tmp -w /tmp ${testImage.id} npm run e2e:protractor"
    }
  }

}
