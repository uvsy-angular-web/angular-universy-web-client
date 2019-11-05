export PROFILE=${AWS_PROFILE}
export STAGE=${AWS_STAGE}


while getopts ":p:s:" opt; do
  case $opt in
    p) PROFILE=$OPTARG
    ;;
    s) STAGE=$OPTARG
    ;;
    \?) echo "Invalid parameter -$OPTARG" >&2
    ;;
  esac
done

if [ -z "$STAGE" ]; then
      STAGE="dev1"
fi

if [ -z "$PROFILE" ]; then
      PROFILE="uvsy-dev"
fi



set -e
printf "##### Build and deploy process starting. #####"


printf "\n %s Phase 1/2: build. %s\n" "-----" "-----"
npm run build --prod --aot

printf "\n %s Phase 2/2: deploy to AWS. %s\n" "-----" "-----"
aws s3 cp ./dist/universy-web "s3://${STAGE}.universy.app" --recursive --profile "${PROFILE}"
