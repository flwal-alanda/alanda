package io.alanda.object.store.rest;

import io.alanda.object.store.dto.AlandaObjectDto;
import io.alanda.object.store.dto.AlandaObjectPropertiesDto;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.tags.Tag;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Tag(name = "AlandaObjectRestService")
@Path("/app/object")
@Produces(MediaType.APPLICATION_JSON)
public interface AlandaObjectRestService {

    @GET
    @Path("/get/{objectGuid}")
    @Produces(MediaType.APPLICATION_JSON)
    AlandaObjectDto getObjectById(@PathParam("objectGuid") Long objectGuid);

    @GET
    @Path("get/all")
    @Produces(MediaType.APPLICATION_JSON)
    List<AlandaObjectDto> getAll();

    @POST
    @Path("/create/{typeId}")
    @Consumes(MediaType.APPLICATION_JSON)
    void createObject( @RequestBody List<AlandaObjectPropertiesDto> properties, @PathParam("typeId") Long typeId);

    @GET
    @Path("/get/all/{objectType}")
    @Produces(MediaType.APPLICATION_JSON)
    List<AlandaObjectDto> getAllFromType(@PathParam("objectType") Long typeId);

    @PUT
    @Path("/update/{guid}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    AlandaObjectDto updateAlandaObject( @RequestBody AlandaObjectDto alandaObjectDto, @PathParam("guid") Long guid);

}
