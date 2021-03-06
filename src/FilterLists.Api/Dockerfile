# Context: .
# Command: docker build -f src/FilterLists.Api/Dockerfile .

# init base
FROM mcr.microsoft.com/dotnet/core/runtime-deps:3.0-alpine as base
EXPOSE 80
ENTRYPOINT ["./FilterLists.Api"]
COPY data/. data/
WORKDIR /app

# init build
FROM mcr.microsoft.com/dotnet/core/sdk:3.0-alpine AS build

# restore
WORKDIR /app/src
COPY src/FilterLists.Data/FilterLists.Data.csproj FilterLists.Data/
COPY src/FilterLists.Services/FilterLists.Services.csproj FilterLists.Services/
WORKDIR /app/src/FilterLists.Api
COPY src/FilterLists.Api/FilterLists.Api.csproj .
RUN dotnet restore

# build
WORKDIR /app/src
COPY src/FilterLists.Data/. FilterLists.Data/
COPY src/FilterLists.Services/. FilterLists.Services/
WORKDIR /app/src/FilterLists.Api
COPY src/FilterLists.Api/. .
RUN dotnet build -c Release -r linux-musl-x64 --no-restore

# init Data.Tests
FROM build AS test-data
ENTRYPOINT ["dotnet", "test", "--logger:trx"]

# restore Data.Tests
WORKDIR /app/tests/FilterLists.Data.Tests
COPY tests/FilterLists.Data.Tests/FilterLists.Data.Tests.csproj .
RUN dotnet restore

# build Data.Tests
COPY tests/FilterLists.Data.Tests/. .
RUN dotnet build -c Release --no-restore
COPY data/. data/

# init Services.Tests
FROM build AS test-services
ENTRYPOINT ["dotnet", "test", "--logger:trx"]

# restore Services.Tests
WORKDIR /app/tests/FilterLists.Services.Tests
COPY tests/FilterLists.Services.Tests/FilterLists.Services.Tests.csproj .
RUN dotnet restore

# build Services.Tests
COPY tests/FilterLists.Services.Tests/. .
RUN dotnet build -c Release --no-restore

# publish
FROM build AS publish
RUN dotnet publish -c Release -r linux-musl-x64 -o out --no-restore --no-build

# final
FROM base as final
COPY --from=publish /app/src/FilterLists.Api/out .
